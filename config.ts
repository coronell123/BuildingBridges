export interface Config {
  appName: string;
  appDescription: string;
  domainName: string;
  colors: {
    main: string;
    theme: string;
  };
}

const config: Config = {
  appName: "Building Bridges",
  appDescription: "Building Bridges - Connecting Communities",
  domainName: process.env.NEXT_PUBLIC_DOMAIN || "buildingbridges.app",
  colors: {
    main: "#2563eb", // blue-600
    theme: "light",
  },
};

export default config; 