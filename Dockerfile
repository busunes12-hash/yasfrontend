# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (use install instead of ci for flexibility)
RUN npm install --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
ARG VITE_GA4_ID
ARG VITE_META_PIXEL_ID
ARG VITE_WA_NUMBER
ARG VITE_API_URL

ENV VITE_GA4_ID=${VITE_GA4_ID}
ENV VITE_META_PIXEL_ID=${VITE_META_PIXEL_ID}
ENV VITE_WA_NUMBER=${VITE_WA_NUMBER}
ENV VITE_API_URL=${VITE_API_URL}

# Build with verbose output
RUN npm run build || { echo "Build failed"; exit 1; }

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]