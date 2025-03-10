import { DogIcon } from "../../public/dog-icon";

export default function DogIconDemo() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dog Icon Demo</h1>
        <DogIcon />
        {/* Different sizes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Different Sizes</h2>
          <div className="flex items-end gap-4">
            <DogIcon width={24} height={24} />
            <DogIcon width={48} height={48} />
            <DogIcon width={96} height={96} />
          </div>
        </div>

        {/* Different colors */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Different Colors</h2>
          <div className="flex items-center gap-4">
            <DogIcon width={48} height={48} color="#ef4444" />
            <DogIcon width={48} height={48} color="#3b82f6" />
            <DogIcon width={48} height={48} color="#22c55e" />
            <DogIcon width={48} height={48} color="#f59e0b" />
          </div>
        </div>

        {/* With Tailwind classes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">With Tailwind Classes</h2>
          <div className="flex items-center gap-4">
            <DogIcon
              width={48}
              height={48}
              className="text-primary hover:text-secondary transition-colors"
            />
            <DogIcon
              width={48}
              height={48}
              className="text-muted-foreground hover:text-primary transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
