FROM node:fermium-alpine
WORKDIR /usr/src/app

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install npm dependencies first (so they may be cached if dependencies don't change)
COPY package.json package.json
COPY packages/hearth/tsconfig.json packages/hearth/tsconfig.json
COPY packages/hearth/package.json packages/hearth/package.json
COPY packages/commons packages/commons
COPY yarn.lock yarn.lock
RUN yarn install --production

# Copy package build
COPY --from=opencrvs-build /packages/hearth packages/hearth

# Copy dependant package(s) source
COPY --from=opencrvs-build packages/commons packages/commons

EXPOSE 2021
WORKDIR /usr/src/app/packages/hearth

CMD yarn start:prod
