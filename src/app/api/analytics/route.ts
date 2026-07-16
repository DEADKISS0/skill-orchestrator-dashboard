import { NextRequest, NextResponse } from "next/server";

// Google Analytics 4 Data API (Free Tier: 2,000 requests/day)
// Configuración requerida en .env.local:
// - GOOGLE_ANALYTICS_PROPERTY_ID: ID de la propiedad GA4
// - GOOGLE_SERVICE_ACCOUNT_KEY: JSON de la Service Account

export async function GET(request: NextRequest) {
  try {
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!propertyId || !serviceAccountKey) {
      // Return simulated data when credentials are not configured
      const data = {
        configured: false,
        message: "Google Analytics no está configurado. Agrega GOOGLE_ANALYTICS_PROPERTY_ID y GOOGLE_SERVICE_ACCOUNT_KEY en .env.local",
        realTime: {
          activeUsers: Math.floor(Math.random() * 20) + 5,
          pageViews: Math.floor(Math.random() * 500) + 200,
          sessions: Math.floor(Math.random() * 50) + 20,
        },
        today: {
          users: Math.floor(Math.random() * 1000) + 500,
          pageViews: Math.floor(Math.random() * 5000) + 2000,
          sessions: Math.floor(Math.random() * 800) + 300,
          bounceRate: (Math.random() * 30 + 30).toFixed(1) + "%",
          avgSessionDuration: Math.floor(Math.random() * 180) + 60,
        },
        topPages: [
          { page: "/", views: Math.floor(Math.random() * 500) + 200, percentage: "35%" },
          { page: "/skills", views: Math.floor(Math.random() * 300) + 100, percentage: "22%" },
          { page: "/reports", views: Math.floor(Math.random() * 200) + 80, percentage: "15%" },
          { page: "/apps", views: Math.floor(Math.random() * 150) + 50, percentage: "12%" },
          { page: "/dashboard", views: Math.floor(Math.random() * 100) + 30, percentage: "8%" },
        ],
        trafficSources: [
          { source: "Direct", percentage: "40%" },
          { source: "Organic", percentage: "30%" },
          { source: "Social", percentage: "20%" },
          { source: "Referral", percentage: "10%" },
        ],
      };
      return NextResponse.json(data);
    }

    // Real GA4 API call would go here
    // For now, return simulated data
    return NextResponse.json({ configured: true, message: "GA4 API no implementada aún" });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
