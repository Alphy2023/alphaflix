import CustomHelmet from "../components/common/CustomHelmet"
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import{Box} from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
const HomePage = () => {
  return (
    <>
      <CustomHelmet title="AlphaFlix" />

      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="popular movies"/>
      </Box>
    </>
  );
}

export default HomePage
