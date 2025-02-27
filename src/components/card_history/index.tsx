"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { fetchDoações, getalimentforid } from "./action";

interface Schedule {
  id: string;
  pickup_date: string;
  title: string;
  food: {
    id: string;
    name?: string;
  };
  food_quantity: number;
  status: string;
}

export const columns: ColumnDef<Schedule>[] = [
  {
    id: "title",
    header: "Título",
    accessorKey: "title",
    cell: ({ row }) => <div>{row.getValue("title") as string}</div>,
  },
  {
    id: "food_name",
    header: "Nome do Alimento",
    accessorKey: "food.name",
    cell: ({ row }) => (
      <div>{(row.getValue("food") as { name?: string }).name || "Desconhecido"}</div>
    ),
  },
  {
    accessorKey: "food_quantity",
    header: "Quantidade",
    cell: ({ row }) => <div>{row.getValue("food_quantity") as number}</div>,
  },
  {
    accessorKey: "pickup_date",
    header: "Data de Retirada",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("pickup_date") as string).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status") as string}</div>,
  },
];

export function CardHistList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const reloadData = async () => {
    setLoading(true);
    try {
      const data = await fetchDoações();
      console.log("Dados recebidos do fetchDoações:", data);
      const schedulesWithFoodNames = await Promise.all(
        data.map(async (schedule) => {
          try {
            console.log("Chamando getalimentforid para o ID:", schedule.food.id);
            const foodName = await getalimentforid(schedule.food.id);
            return {
              ...schedule,
              food: {
                ...schedule.food,
                name: foodName,
              },
            };
          } catch (error) {
            console.error(`Erro ao carregar nome do alimento para o ID ${schedule.food.id}:`, error);
            return {
              ...schedule,
              food: {
                ...schedule.food,
                name: "Desconhecido",
              },
            };
          }
        })
      );
      setSchedules(schedulesWithFoodNames);
    } catch (error) {
      console.error("Erro ao carregar doações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  const table = useReactTable({
    data: schedules,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome do alimento..."
          value={(table.getColumn("food_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("food_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}
