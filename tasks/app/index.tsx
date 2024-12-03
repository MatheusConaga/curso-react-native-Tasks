import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";

export default function Main() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      router.replace("/screens/AuthOrApp");
    }
  }, [isReady, router]);

  return null;
}
