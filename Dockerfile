FROM node:alpine AS builder

WORKDIR /opt/builder

COPY yarn.lock .
COPY package.json .

RUN yarn

COPY . .

RUN yarn build

FROM node:alpine AS run

WORKDIR /opt/app

COPY --from=builder /opt/builder/dist ./dist
COPY yarn.lock .
COPY package.json .

RUN yarn install --production

EXPOSE 3000

ENTRYPOINT ["yarn"]
CMD ["start"]
