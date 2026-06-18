FROM node:20-slim
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
ENV PORT=8080
CMD sh -c "if [ -n \"$FIREBASE_CONFIG\" ]; then echo \"$FIREBASE_CONFIG\" > TheFinalPlunge/firebase-applet-config.json; fi && node TheFinalPlunge/server.cjs"
