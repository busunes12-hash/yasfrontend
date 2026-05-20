# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build arguments for Vite environment variables
ARG VITE_GA4_ID
ARG VITE_META_PIXEL_ID
ARG VITE_WA_NUMBER
ARG VITE_API_URL

ENV VITE_GA4_ID=${VITE_GA4_ID}
ENV VITE_META_PIXEL_ID=${VITE_META_PIXEL_ID}
ENV VITE_WA_NUMBER=${VITE_WA_NUMBER}
ENV VITE_API_URL=${VITE_API_URL}

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
