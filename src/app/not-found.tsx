import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted">404</p>
      <h1 className="text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p className="max-w-md text-sm text-muted sm:text-base">
        The page you are looking for doesn&apos;t exist. Find a cover for your iPhone or Samsung instead.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" pill>Go home</ButtonLink>
        <ButtonLink href="/covers" variant="outline" pill>All covers</ButtonLink>
      </div>
    </Container>
  );
}
