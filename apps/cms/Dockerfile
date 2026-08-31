FROM node:22-slim AS build
WORKDIR /opt/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:22-slim
WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=build /opt/app ./
RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm","run","start"]