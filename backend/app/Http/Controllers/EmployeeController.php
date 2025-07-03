<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\StoreEmployeeRequest;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees, Response::HTTP_OK);
    }

    public function show($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Empleado no encontrado'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($employee, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $data['firstname'] = $request['firstname'];
        $data['lastname'] = $request['lastname'];
        $data['email'] = $request['email'];
        $data['phone'] = $request['phone'];
        $data['address'] = $request['address'];
        $data['job'] = $request['job'];

        $employee = Employee::create($data);

        return response()->json([
          'message' => "Empleado Creado Exitosamente",
          'success' => true,
          'data' => $employee
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data['firstname'] = $request['firstname'];
        $data['lastname'] = $request['lastname'];
        $data['email'] = $request['email'];
        $data['phone'] = $request['phone'];
        $data['address'] = $request['address'];
        $data['job'] = $request['job'];

        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Empleado no encontrado'], Response::HTTP_NOT_FOUND);
        }

        $employee->update($data);

        return response()->json([
            'message' => "Empleado actualizado",
            'success' => true
        ], 200);
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Empleado no encontrado'], Response::HTTP_NOT_FOUND);
        }

        $employee->delete();

        return response()->json(['message' => 'Empleado eliminado'], Response::HTTP_OK);
    }
}
