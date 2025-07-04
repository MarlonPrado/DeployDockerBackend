FROM node:18.20.4

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y curl
RUN apt-get update && apt-get install -y ca-certificates-java
RUN apt-get update && apt-get install -y default-jre default-jdk

WORKDIR /usr/src/app

COPY . .
RUN yarn config set network-timeout 300000
RUN yarn global add node-gyp
#RUN yarn install --ignore-scripts
RUN yarn install
RUN yarn build

#RUN npm prune --production

EXPOSE 4000
EXPOSE 4001
EXPOSE 4100

CMD ["yarn", "start"]