import { connectToDatabase } from "@/lib/mongodb";
import Analytics from "@/models/Analytics";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const newEntry = new Analytics(body);
    await newEntry.save();

    return NextResponse.json({ message: "Dados salvos com sucesso." }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return NextResponse.json({ error: "Erro ao salvar dados." }, { status: 500 });
  }
}