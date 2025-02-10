interface PricingPlan {
  priceId: string | null;
  name: string;
  description: string;
  price: number | null;
  priceAnchor: number | null;
  isFeatured?: boolean;
  features: { name: string }[];
}

export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  crisp: {
    id: string;
    onlyShowOnRoutes: string[];
  };
  stripe: {
    plans: PricingPlan[];
  };
  aws: {
    bucket: string;
    bucketUrl: string;
    cdn: string;
  };
  resend: {
    subdomain: string;
    fromNoReply: string;
    fromAdmin: string;
    supportEmail: string;
    forwardRepliesTo: string;
  };
  colors: {
    theme: string;
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
} 