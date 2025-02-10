import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // Name of the application used for branding and SEO
  appName: "Diffusione AI",
  // Brief description of the application for SEO purposes; can be customized
  appDescription:
    "A Microservice to generate you products on models",
  // Domain name of the application without protocol or trailing slash
  domainName: "diffusione.app",
  crisp: {
    // Crisp support widget ID; leave empty if Crisp is not used
    id: "",
    // Define which routes should show the Crisp chat widget; set to ["/"] to show only on the homepage
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Define your Stripe pricing plans with unique price IDs
    plans: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QpnrsP7OPF3lmY1Wv96rUFK"
            : "price_1QpnrsP7OPF3lmY1Wv96rUFK",
        name: "Free",
        description: "Perfect for getting started",
        price: 0,
        priceAnchor: 0,
        features: [
          { name: "50 AI generations per month" },
          { name: "Basic editing tools" },
          { name: "Standard support" },
          { name: "Community access" }
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QXPc2P7OPF3lmY1ii3GC2lT"
            : "price_1QXPc3P7OPF3lmY1tQX01WIb", // Yearly price
        isFeatured: true,
        name: "Standard",
        description: "For professionals and creators",
        price: 29,
        priceAnchor: 39,
        features: [
          { name: "Unlimited AI generations" },
          { name: "Advanced editing tools" },
          { name: "Priority support" },
          { name: "Custom presets" },
          { name: "Batch processing" }
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QXPc3P7OPF3lmY1QGxJilm2"
            : "price_1QXPc3P7OPF3lmY1hEaQoWDh", // Yearly price
        name: "Premium",
        description: "For power users and teams",
        price: 99,
        priceAnchor: 129,
        features: [
          { name: "Everything in Standard" },
          { name: "API access" },
          { name: "Custom branding" },
          { name: "Team collaboration" },
          { name: "Advanced analytics" },
          { name: "24/7 priority support" }
        ],
      },
      {
        priceId: null,
        name: "Business",
        description: "Custom solutions for enterprises",
        price: null,
        priceAnchor: null,
        features: [
          { name: "Everything in Premium" },
          { name: "Dedicated account manager" },
          { name: "Custom integration support" },
          { name: "SLA guarantees" },
          { name: "Enterprise security features" }
        ],
      }
    ],
  },
  aws: {
    // AWS S3/CloudFront configuration for asset storage (if using)
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // Subdomain for sending emails; remove if not using a subdomain
    subdomain: "mg",
    // Required email 'From' field for sending magic login links
    fromNoReply: process.env.SEND_EMAIL_FROM,
    // Required email 'From' field for other types of emails like updates
    fromAdmin: `Elias at Diffusione <elias@fjelinek.de>`,
    // Support email shown to customers; leave empty if not needed
    supportEmail: "youremail@yourwebsite.com",
    // Forward replies from the support email to another address
    forwardRepliesTo: "elias@fjelinek.de",
  },
  colors: {
    // DaisyUI theme name to apply; defaults to dark theme
    theme: "light",
    // Main color used throughout the application, including the loading bar and browser tabs
    main: themes["light"]["primary"],
  },
  auth: {
    // Path for user login; used to protect private routes
    loginUrl: "/api/auth/signin",
    // Redirect URL after successful login; usually a private user dashboard
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
