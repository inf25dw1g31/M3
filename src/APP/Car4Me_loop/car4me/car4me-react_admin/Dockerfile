# React-Admin — build estático + Nginx

FROM node:24-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# CRA: REACT_APP_API_URL
ARG REACT_APP_API_URL=http://localhost:3000
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build


FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
