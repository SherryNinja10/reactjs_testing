// app/api/books/[id]/route.js

import books from "@/app/api/db";

export async function PUT(request, context) {
  const id = +context.params.id;
  const book = await request.json();

  const index = books.findIndex((b) => b.id === id);
  books[index] = book;
  
  return Response.json(books);
}

export async function DELETE(request, context) {
    const id = +context.params.id;

    const index = books.findIndex((b) => b.id === id);
    books.splice(index, 1);
    return Response.json(books);
}
