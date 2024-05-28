export async function POST(request: Request) {
  // Return json response:
  return new Response(JSON.stringify({ message: 'Hello, from API!' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
