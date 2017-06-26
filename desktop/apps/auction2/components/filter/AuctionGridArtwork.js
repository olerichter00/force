import BidStatus from './BidStatus'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import titleAndYear from 'desktop/apps/auction2/utils/titleAndYear'

function AuctionGridArtwork ({ isClosed, saleArtwork }) {
  const artwork = saleArtwork.artwork
  const artists = artwork.artists

  const artistDisplay = artists && artists.length > 0
    ? artists.map((aa) => aa.name).join(', ')
    : null

  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

  return (
    <a className='auction2-page-grid-artwork' key={artwork._id} href={`/artwork/${artwork.id}`}>
      <div className='auction2-page-grid-artwork__image-container'>
        <div className='vam-outer'>
          <div className='vam-inner'>
            <div className='auction2-page-grid-artwork__image'>
              <img src={artworkImage} alt={artwork.title} / >
            </div>
          </div>
        </div>
      </div>
      <div className='auction2-page-grid-artwork__metadata'>
        <div className='auction2-page-grid-artwork__lot-information'>
          <div className='auction2-page-grid-artwork__lot-number'>
            Lot {saleArtwork.lot_label}
          </div>
          { !isClosed &&
            <BidStatus
              saleArtwork={saleArtwork}
            /> }
        </div>
        <div className='auction2-page-grid-artwork__artists'>
          {artistDisplay}
        </div>
        <div
          className='auction2-page-grid-artwork__title'
          dangerouslySetInnerHTML={{
            __html: titleAndYear(artwork.title, artwork.date)
          }}
        />
      </div>
    </a>
  )
}

AuctionGridArtwork.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  saleArtwork: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.auctionArtworks.isClosed
  }
}

export default connect(
  mapStateToProps
)(AuctionGridArtwork)
