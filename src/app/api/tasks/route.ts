import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data';

export async function GET() {
  return NextResponse.json(dataStore.getAll());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTask = dataStore.create(body);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 400 });
  }
}
