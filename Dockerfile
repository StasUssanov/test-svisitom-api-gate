FROM node:16.12-alpine as build
WORKDIR /home/app
COPY . .
RUN yarn install
RUN yarn run build

FROM node:16.12-alpine
WORKDIR /home/app
COPY --from=build /home/app/dist .
COPY --from=build /home/app/package.json .
COPY --from=build /home/app/yarn.lock .
RUN yarn install --prod
EXPOSE 8080
CMD yarn run start:docker
