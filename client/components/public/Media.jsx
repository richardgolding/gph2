import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Segment, Image, Divider, Icon } from 'semantic-ui-react';

Media = class Media extends Component {

  render() {
    return (
      <Container className="section">
      <Segment basic>
        <PuzzlePageTitle title="Media" subTitle={<span>Photo Credit: <a href="http://www.gabrielleponcz.com/" target="_blank">Gabrielle Poncz</a></span>} />

        <h2 style={{fontWeight: "600"}}>Check out videos of past Hunts on our 
        <a href="https://www.youtube.com/channel/UCTc814_FbilFiSVktIWec8A" target="_blank">
          &nbsp;<Icon name="youtube" />
          YouTube channel
        </a>
        !</h2>
        
        <Image.Group size="medium">
          <Image
            src='https://i.ytimg.com/vi_webp/IZU0sLW9pJk/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2021', color: 'black'}}
            href='https://www.youtube.com/watch?v=IZU0sLW9pJk'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/UCpneLPGd50/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2019', color: 'black'}}
            href='https://www.youtube.com/watch?v=UCpneLPGd50'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/R3jAEHvdwmY/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2019', color: 'black'}}
            href='https://www.youtube.com/watch?v=R3jAEHvdwmY'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/paBGQzMCdUo/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2018', color: 'black'}}
            href='https://www.youtube.com/watch?v=paBGQzMCdUo'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/KApV94SL22I/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2018', color: 'black'}}
            href='https://www.youtube.com/watch?v=KApV94SL22I'
            target="_blank"
          />
          <Image
            src='https://i1.ytimg.com/vi/Df_37koPcB0/mqdefault.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2018', color: 'black'}}
            href='https://www.youtube.com/watch?v=Df_37koPcB0'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/z6dBrfYnXv0/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2017', color: 'black'}}
            href='https://www.youtube.com/watch?v=z6dBrfYnXv0'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/LYzpNT-vX7s/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2017', color: 'black'}}
            href='https://www.youtube.com/watch?v=LYzpNT-vX7s'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/CdsC0CHKsHM/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2016', color: 'black'}}
            href='https://www.youtube.com/watch?v=CdsC0CHKsHM'
            target="_blank"
          />
          <Image
            src='https://i.ytimg.com/vi_webp/d0RSN_hGAyM/maxresdefault.webp'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2016', color: 'black'}}
            href='https://www.youtube.com/watch?v=d0RSN_hGAyM'
            target="_blank"
          />        
        </Image.Group>
        <Divider />
        <h2 style={{fontWeight: "600"}}>WWU Great Puzzle Hunt Photos</h2>
        <Image.Group size="medium">
          <Image
            src='/img/media-page/cover_2019.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2019', color: 'black' }}
            href='https://flic.kr/s/aHsmHnsMjP'
            target='_blank'
            />

          <Image
            src='/img/media-page/cover_2018_1.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2018', color: 'black' }}
            href='https://flic.kr/s/aHsmTFUGZT'
            target='_blank'
            />
          <Image
            src='/img/media-page/cover_2018_2.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2018', color: 'black' }}
            href='https://flic.kr/s/aHsmTFUN1u'
            target='_blank'
            />

          <Image
            src='/img/media-page/cover_2017.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2017', color: 'black' }}
            href='https://flic.kr/s/aHsmTsVoRy'
            target='_blank'
            />

          <Image
            src='/img/media-page/cover_2016.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2016', color: 'black' }}
            href='https://flic.kr/s/aHsmTsVf8r'
            target='_blank'
            />
        </Image.Group>
      </Segment>
      </Container>
    );
  }

}
