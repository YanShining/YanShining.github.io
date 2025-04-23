import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.140.0/http/file_server.ts";

const port = 8000;

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);

await serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  
  // 设置CORS头
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  };

  // 处理OPTIONS请求
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  // 使用serveDir处理静态文件请求
  return await serveDir(req, {
    fsRoot: ".",
    urlRoot: "",
    showDirListing: true,
    enableCors: true
  });
}, {
  port: port
});