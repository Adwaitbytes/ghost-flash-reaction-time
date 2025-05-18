
import GameScreen from "@/components/game/GameScreen";

const Index = () => {
  return (
    // #root in index.css already handles centering and min-height
    // So we can directly render the GameScreen
    <GameScreen />
  );
};

export default Index;
