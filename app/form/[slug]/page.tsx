"use client";

import { notFound, useParams } from "next/navigation";

// import { useCreateLead } from "@/features/public-form/hooks/use-create-lead";
import { LeadForm } from "./components/lead-form";
import { usePublicForm } from "@/features/form";
import { PageLoader } from "@/components/common";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateLeadPublic } from "@/features/lead/hooks/use-lead";
import { LeadFormValues } from "@/features/lead/schemas/lead";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function PublicFormPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = usePublicForm(slug);

  const createLead = useCreateLeadPublic();
  const [ipAddress, setIpAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    getIpAddress();
  }, []);

  if (isLoading) {
    return <PageLoader message="Form Loading" />;
  }

  if (!data?.success) {
    notFound();
  }

  const { data: form } = data;

  const handleSubmit = (data: LeadFormValues) => {
    const leadData = {
      ...data,
      ipAddress: ipAddress,
      formId: form.id,
    };
    createLead.mutate(leadData, {
      onSuccess: () => {
        // toast.success(response.message ?? "Lead submitted successfully.");

        setSubmitted(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-center text-green-600">
              Thank You!
            </CardTitle>

            <CardDescription className="text-center">
              Your information has been submitted successfully.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              className="w-full"
              onClick={() => {
                setSubmitted(false);
              }}
            >
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-muted/30 p-6">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>{form.name}</CardTitle>

          <CardDescription>Please fill out the form below.</CardDescription>
        </CardHeader>

        <CardContent>
          <LeadForm loading={createLead.isPending} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </main>
  );
}
