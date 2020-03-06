FROM node:carbon AS compiled
WORKDIR /app

ADD package.json .
RUN npm i

ADD src ./src
ADD index.js .
ADD tsconfig.json .
RUN npm run compile

FROM node:carbon AS dependencies
WORKDIR /app

ADD package.json .
RUN npm i --only=production

FROM node:carbon-alpine AS stage
WORKDIR /app

COPY --from=compiled /app/index.js .
COPY --from=compiled /app/dist dist
COPY --from=dependencies /app/node_modules node_modules

EXPOSE 8080
CMD [ "node", "index.js" ]
