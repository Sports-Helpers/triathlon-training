import * as fs from "fs";
import { MAPPED_ROUTES } from "@/services/routing/routes";
import type { RouteInfo } from "@/services/routing/types";

function addStartingStringsToSiteMap() {
    let start = ``;

    start += `<?xml version="1.0" encoding="UTF-8"?>\n`;
    start += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    return start;
}

function addEndingStringsToSiteMap() {
    return `</urlset>`;
}

function addRouteStringsToSiteMap() {
    let routeStrings = ``;

    Object.keys(MAPPED_ROUTES).forEach((route) => {
        const info: RouteInfo = MAPPED_ROUTES[route as keyof typeof MAPPED_ROUTES];
        if (!info.addToSiteMap) {
            return;
        }
        routeStrings += addSingleRouteStringToSiteMap(info);
    });

    return routeStrings;
}

function addSingleRouteStringToSiteMap(routeInfo: RouteInfo) {
    let route = ``;

    route += `  <url>\n`;
    route += `    <loc>${process.env.VITE_APP_URL}${routeInfo.path}</loc>\n`;
    route += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    route += `  </url>\n`;

    return route;
}

async function createSitemap() {
    let sitemap: string = "";

    sitemap += addStartingStringsToSiteMap();
    sitemap += addRouteStringsToSiteMap();
    sitemap += addEndingStringsToSiteMap();

    await fs.promises.writeFile("dist/sitemap.xml", sitemap);
}

async function createRobotsTxt() {
    let robots = ``;

    robots += `User-agent: *\n`;
    robots += `Allow: /\n`;
    robots += `Disallow:\n`;
    robots += `\n`;
    robots += `Sitemap: ${process.env.VITE_APP_URL}/sitemap.xml`;

    await fs.promises.writeFile("dist/robots.txt", robots);
}

await createSitemap();
await createRobotsTxt();
