_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Curation = require '../../../../../models/curation.coffee'
{ resolve } = require 'path'

describe 'Venice Main', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        window: history: replaceState: @replaceState = sinon.stub()
      Backbone.$ = $
      @curation =
        description: 'description'
        sections: [
          {
            description: 'description'
            cover_image: ''
            video_url: '/vanity/url.mp4'
            slug: 'slug-one'
          },
          {
            description: 'description2'
            cover_image: ''
            video_url: '/vanity/url2.mp4'
            slug: 'slug-two'
            published: true
          }
        ]
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
        videoIndex: 0
        curation: new Curation @curation
      benv.render resolve(__dirname, '../../../components/venice_2017/templates/index.jade'), @options, =>
        VeniceView = benv.requireWithJadeify resolve(__dirname, '../../../components/venice_2017/client/index'), []
        VeniceView.__set__ 'sd',
          APP_URL: 'localhost'
          VIDEO_INDEX: 0
          CURATION: @curation
        VeniceView.__set__ 'VeniceVideoView', @VeniceVideoView = sinon.stub().returns
          vrView: play: @play = sinon.stub()
          trigger: sinon.stub()
        VeniceView.__set__ 'initCarousel', @initCarousel = sinon.stub().yields
          cells: flickity:
            on: @on = sinon.stub()
            selectedIndex: 1
        @view = new VeniceView
          el: $('body')
        done()

  after ->
    benv.teardown()

  it 'initializes VeniceVideoView', ->
    @VeniceVideoView.args[0][0].el.selector.should.equal '.venice-video'
    @VeniceVideoView.args[0][0].video.should.equal 'localhost/vanity/url.mp4'

  it 'sets up the carousel', ->
    @initCarousel.args[0][0].selector.should.equal '.venice-carousel'
    @initCarousel.args[0][1].imagesLoaded.should.be.true()
    @initCarousel.args[0][1].advanceBy.should.equal 1
    @initCarousel.args[0][1].wrapAround.should.be.true()
    @initCarousel.args[0][1].initialIndex.should.equal 0

  it 'changes the section when a new carousel item is selected', ->
    @on.args[0][1]()
    @replaceState.args[0][1].should.equal 1
    @replaceState.args[0][2].should.equal 'slug-two'
    @view.VeniceVideoView.trigger.args[0][0].should.equal 'swapVideo'
    @view.VeniceVideoView.trigger.args[0][1].video.should.equal 'localhost/vanity/url2.mp4'

  it '#fadeOutCoverAndStartVideo', ->
    $('.venice-overlay__play').click()
    @play.callCount.should.equal 1
