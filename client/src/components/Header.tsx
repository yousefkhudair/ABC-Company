import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            ABC Company
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/plan" className="text-gray-600 hover:text-primary">
              Plan travel
            </Link>
            <Link href="/info" className="text-gray-600 hover:text-primary">
              Travel information
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-primary">
              Deals
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-primary">
              Help
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost">Log in</Button>
            <Button>Join</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
