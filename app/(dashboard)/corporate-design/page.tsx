import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Resources data
const resources = [
  {
    title: "Logo Package",
    description: "All versions of the Building Bridges logo in various formats (SVG, PNG, AI)",
    downloadUrl: "/downloads/building-bridges-logos.zip",
  },
  {
    title: "Brand Guidelines",
    description: "Comprehensive guide for using our brand assets, colors, and typography",
    downloadUrl: "/downloads/brand-guidelines.pdf",
  },
  {
    title: "Color Palette",
    description: "Official color codes and usage guidelines in various formats",
    downloadUrl: "/downloads/color-palette.pdf",
  },
  {
    title: "Typography Package",
    description: "Font files and typography guidelines",
    downloadUrl: "/downloads/typography-package.zip",
  },
  {
    title: "Social Media Templates",
    description: "Pre-designed templates for various social media platforms",
    downloadUrl: "/downloads/social-media-templates.zip",
  },
];

export default async function CorporateDesignPage() {
  // Check if user is authenticated and is an admin
  const session = await auth();
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="container-content py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Corporate Design Resources</h1>
        <p className="text-muted-foreground text-lg">
          Access and download official Building Bridges brand assets and guidelines.
          These resources are exclusively available to administrators.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.title} className="p-6">
            <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <Button asChild>
              <a href={resource.downloadUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>• All resources are confidential and for internal use only</li>
          <li>• Do not share these files with unauthorized users</li>
          <li>• Always refer to the brand guidelines when using these assets</li>
          <li>• For questions or special requests, contact the design team</li>
        </ul>
      </div>
    </div>
  );
} 