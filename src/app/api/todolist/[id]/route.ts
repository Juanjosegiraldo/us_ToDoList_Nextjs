import Todolist from "@/database/models/todolist";
import conectionDB from "@/lib/mongodb";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Context) {
  try {
    await conectionDB();
    const { id } = await params;
    const body = await request.json();

    const actualizada = await Todolist.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!actualizada) {
      return Response.json(
        { data: null, code: 404, message: "tarea no encontrada" },
        { status: 404 }
      );
    }

    return Response.json({
      data: actualizada,
      code: 200,
      message: "tarea actualizada",
    });
  } catch (err) {
    return Response.json(
      {
        data: null,
        code: 500,
        message: err instanceof Error ? err.message : "error al actualizar",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  try {
    await conectionDB();
    const { id } = await params;

    const eliminada = await Todolist.findByIdAndDelete(id);

    if (!eliminada) {
      return Response.json(
        { data: null, code: 404, message: "tarea no encontrada" },
        { status: 404 }
      );
    }

    return Response.json({
      data: eliminada,
      code: 200,
      message: "tarea eliminada",
    });
  } catch (err) {
    return Response.json(
      {
        data: null,
        code: 500,
        message: err instanceof Error ? err.message : "error al eliminar",
      },
      { status: 500 }
    );
  }
}
