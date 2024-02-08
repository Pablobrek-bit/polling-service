type Message = { pollOptionId: string; votes: number };
type Subscriber = (message: Message) => void;

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {};

  subscribe(pollID: string, subscriber: Subscriber) {
    if (!this.channels[pollID]) {
      this.channels[pollID] = [];
    }

    this.channels[pollID].push(subscriber);
  }

  publish(pollID: string, message: Message) {
    if (!this.channels[pollID]) {
      return;
    }

    for (const subscriber of this.channels[pollID]) {
      subscriber(message);
    }
  }
}

export const voting = new VotingPubSub();
