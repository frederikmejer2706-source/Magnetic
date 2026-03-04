import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" data-testid="page-coming-soon">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[#FF9F43]/10 mx-auto mb-6 flex items-center justify-center">
          <Construction className="w-10 h-10 text-[#FF9F43]" />
        </div>
        <h1 className="text-3xl font-black text-foreground mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground font-medium">
          This feature is coming soon. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
