#!/bin/bash

# setup-env.sh
# Purpose: Sets up environment configuration files for different deployment environments
# Author: Building Bridges Team
# Created: 2024-03-24

# Set strict error handling
set -euo pipefail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to generate a secure random string
generate_secret() {
    openssl rand -base64 32
}

# Function to create environment file
create_env_file() {
    local env_type=$1
    local template_file=".env.${env_type}.template"
    local env_file=".env.${env_type}"
    
    log_info "Creating ${env_file}..."
    
    # Check if file already exists
    if [ -f "$env_file" ]; then
        log_warn "${env_file} already exists. Creating backup..."
        cp "${env_file}" "${env_file}.backup-$(date +%Y%m%d-%H%M%S)"
    fi
    
    # Generate environment-specific variables
    case "$env_type" in
        "development")
            cat > "$env_file" << EOF
# Development Environment Configuration
# Generated on $(date)

# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/building_bridges_dev"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(generate_secret)"

# Feature Flags
ENABLE_MENTORSHIP=true
ENABLE_NOTIFICATIONS=true

# API Keys (Replace with actual keys in production)
STRIPE_PUBLIC_KEY="pk_test_your_stripe_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_key"

# Logging
LOG_LEVEL="debug"
EOF
            ;;
            
        "test")
            cat > "$env_file" << EOF
# Test Environment Configuration
# Generated on $(date)

# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/building_bridges_test"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(generate_secret)"

# Feature Flags
ENABLE_MENTORSHIP=true
ENABLE_NOTIFICATIONS=false

# API Keys (Test environment keys)
STRIPE_PUBLIC_KEY="pk_test_your_stripe_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_key"

# Logging
LOG_LEVEL="debug"
EOF
            ;;
            
        "production")
            cat > "$template_file" << EOF
# Production Environment Configuration Template
# Generated on $(date)
# IMPORTANT: Copy this file to .env.production and update with actual values

# Database Configuration
DATABASE_URL="postgresql://user:password@host:5432/building_bridges_prod"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="replace_with_secure_secret"

# Feature Flags
ENABLE_MENTORSHIP=true
ENABLE_NOTIFICATIONS=true

# API Keys (Replace with production keys)
STRIPE_PUBLIC_KEY="pk_live_your_stripe_key"
STRIPE_SECRET_KEY="sk_live_your_stripe_key"

# Logging
LOG_LEVEL="info"
EOF
            log_info "Created production template file. Copy to .env.production and update with actual values."
            return
            ;;
            
        *)
            log_error "Unknown environment type: ${env_type}"
            exit 1
            ;;
    esac
    
    log_info "Successfully created ${env_file}"
}

main() {
    log_info "Starting environment setup..."
    
    # Create scripts directory if it doesn't exist
    mkdir -p scripts
    
    # Create environment files
    create_env_file "development"
    create_env_file "test"
    create_env_file "production"
    
    log_info "Environment setup complete!"
    log_warn "Remember to:"
    log_warn "1. Update the database credentials in your environment files"
    log_warn "2. Set proper API keys for your environments"
    log_warn "3. Keep your environment files secure and never commit them to version control"
}

# Execute main function
main 