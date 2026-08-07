import { PageContainer, PageHeader } from "@/components/common";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Overview of your lead distribution system."
      />

      <div className="rounded-xl border p-6">Dashboard Content</div>
    </PageContainer>
  );
}
