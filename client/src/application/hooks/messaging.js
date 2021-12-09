import { useEffect } from "react";
import { useMessaging } from "../firebase/hooks";
import { subscribeGroupTopic, unsubscribeGroupTopic } from "../api";

export function useGroupTopic({ groupId, onMessage}) {
  const { token } = useMessaging({ onMessage });
  
  useEffect(
    () => {
      if (!token || !groupId) {
        return;
      }
      async function subscribe() {
        try {
          return await subscribeGroupTopic({ groupId, token });
      } catch (error) {
          console.error('Cannot subscribe to group message:', groupId, error);
        }
      }
      async function unsubscribe() {
        try {
          return await unsubscribeGroupTopic({ groupId, token });
      } catch (error) {
          console.error('Cannot unsubscribe to group message:', groupId, error);
        }
      }
      subscribe();
      return unsubscribe;
    },
    [token, groupId],
  );
}