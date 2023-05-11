import CustomHelmet from "../components/common/CustomHelmet"
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import{Box} from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide"
const HomePage = () => {
  return (
    <>
      <CustomHelmet title="AlphyFlix" />

      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        {/* popular movies */}
        <Container header="popular movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>
        {/* popular movies */}
        {/* popular series */}
        <Container header="popular series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>
        {/* popular series */}
        {/*toprated movies */}
        <Container header="top rated movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>
        {/*toprated movies  */}
        {/*toprated series */}
        <Container header="top rated series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>
        {/*toprated series */}
      </Box>
    </>
  );
}

export default HomePage
