import Todolist from "@/database/models/todolist";
import conectionDB from "@/lib/mongodb";

export async function GET() {
  try {
    await conectionDB();
    const datos = await Todolist.find({});

    return Response.json({
      data: datos,
      code: 200,
      message: "el servicio contesto",
    });
  } catch (err) {
    return Response.json(
      {
        data: null,
        code: 500,
        message: err instanceof Error ? err.message : "error al leer las tareas",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await conectionDB();
    const body = await request.json();

    if (!body.title || !body.state) {
      return Response.json(
        {
          data: null,
          code: 400,
          message: "title y state son obligatorios",
        },
        { status: 400 }
      );
    }

    const nuevaTarea = await Todolist.create({
      title: body.title,
      state: body.state,
      startDate: body.startDate,
      endDate: body.endDate,
    });

    return Response.json(
      {
        data: nuevaTarea,
        code: 201,
        message: "tarea creada",
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        data: null,
        code: 500,
        message: err instanceof Error ? err.message : "error al crear la tarea",
      },
      { status: 500 }
    );
  }
}
