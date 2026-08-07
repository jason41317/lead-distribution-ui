"use client";

import { useForms } from "../hooks/use-form";

import { PageLoader } from "@/components/common";
import { Form } from "../types/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormRowActions } from "./form-actions";

interface Props {
  onEdit: (form: Form) => void;
  onDelete: (form: Form) => void;
}

export default function FormTable({ onEdit, onDelete }: Props) {
  const { data, isLoading, error } = useForms();

  if (isLoading) {
    return <PageLoader message="Loading forms..." />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-6">
        Failed to load forms.
      </div>
    );
  }

  const forms: Form[] = (data?.data ?? []) as Form[];

  return (
    <>
      <div className="rounded-xl border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b bg-muted/50">
              <TableHead className="p-4 text-left">Name</TableHead>
              <TableHead className="p-4 text-left">
                Slug
              </TableHead>
              <TableHead className="p-4 text-left w-10">

              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {forms.map((form) => (
              <TableRow key={form.id} className="border-b">
                <TableCell className="p-4">
                  {form.name}
                </TableCell>
                <TableCell className="p-4">
                  {form.slug}
                </TableCell>

                <TableCell className="p-4 font-bold">
                  <FormRowActions
                    form={form}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
