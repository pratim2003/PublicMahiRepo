import connect from 'src/lib/db';
import { createDesignController, getAllDesignsController } from 'src/controllers/design';

export async function GET(req: Request): Promise<Response> {
  await connect();
  try {
    const designs = await getAllDesignsController();

    return Response.json({ designs }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching designs:', error);
    return Response.json(
      {
        message: 'Error getting designs',
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<Response> {
  await connect();
  try {
    const newDesign: Promise<any> = await createDesignController(req);

    return Response.json(
      {
        message: 'Design created successfully',
        design: newDesign,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating design:', error);
    return Response.json(
      {
        message: 'Error creating design',
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
