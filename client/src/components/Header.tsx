import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useState, useEffect } from "react";

type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed: boolean;
  onPressedChange: () => void;
  children: React.ReactNode;
};

function Toggle({ pressed, onPressedChange, children, ...props }: ToggleProps) {
  return (
    <button
      {...props}
      onClick={onPressedChange}
      className={`
        border border-gray-300 px-3 py-1 rounded-md hover:border-gray-400 ${pressed ? "bg-blue-500 text-white" : "bg-white text-gray-700"}
      `}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const { showDealsButton } = useFlags();
  const [isPremium, setIsPremium] = useState(false);
  const [isInternalUser, setIsInternalUser] = useState(false);
  const ldClient = useLDClient();

  // Update the LaunchDarkly user object when user state changes
  useEffect(() => {
    if (ldClient) {
      // Use either 'internal-user' or 'anonymous-user' based on toggle state
      const userId = isInternalUser ? 'internal-user' : 'anonymous-user';
      
      // Store it for consistency between sessions
      localStorage.setItem("user_id", userId);
      
      const context = {
        kind: 'user',
        key: userId,
        isPremium: isPremium,
        anonymous: !isInternalUser,
      };

      ldClient.identify(context).then(() => {
        console.log("User identified with LaunchDarkly:", context);
      });
    }
  }, [isPremium, isInternalUser, ldClient]);

  const handlePremiumToggle = () => {
    setIsPremium(!isPremium);
  };
  
  const handleUserToggle = () => {
    setIsInternalUser(!isInternalUser);
  };

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
            {showDealsButton && (
              <Link href="/deals" className="text-gray-600 hover:text-primary">
                Deals
              </Link>
            )}
            <Link href="/help" className="text-gray-600 hover:text-primary">
              Help
            </Link>
            <div className="flex space-x-2">
              <Toggle
                pressed={isPremium}
                onPressedChange={handlePremiumToggle}
                className="text-sm"
              >
                {isPremium ? "Premium" : "Standard"}
              </Toggle>
              
              <Toggle
                pressed={isInternalUser}
                onPressedChange={handleUserToggle}
                className="text-sm"
              >
                {isInternalUser ? "Internal_User" : "Anon"}
              </Toggle>
            </div>
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
