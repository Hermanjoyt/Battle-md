# ⚔️ BATTLE MD WHATSAPP BOT
# 👑 Owner: KHAREL HERMAN KAMULEGEYA

FROM node:lts-buster

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g pm2

# Copy the rest of the project
COPY . .

# Environment variables
ENV NODE_ENV=production
ENV PORT=7860

# Expose the port
EXPOSE 7860

# Start using PM2 (more stable than npm start)
CMD ["pm2-runtime", "start", "npm", "--name", "battle-md", "--", "start"]
