/**
 * Dataset used by Storybook stories.
 *
 * Copied from a NRN instance "window.__CYPRESS_DATA__" and pasted there.
 */
const dataset = {
  'reci9HYsoqd1xScsi': {
    '__typename': 'Customer',
    'id': 'reci9HYsoqd1xScsi',
    'ref': 'customer1',
    'label': 'Client 1',
    'availableLanguages': ['en', 'fr'],
    'theme': {
      '__typename': 'Theme',
      'id': 'recrcZANU6L73OA9v',
      'primaryColor': '#00536F',
      'primaryColorVariant1': null,
      'onPrimaryColor': null,
      'secondaryColor': '#C90016',
      'secondaryColorVariant1': null,
      'onSecondaryColor': null,
      'backgroundColor': null,
      'onBackgroundColor': null,
      'surfaceColor': null,
      'onSurfaceColor': null,
      'errorColor': null,
      'onErrorColor': null,
      'fonts': null,
      'logo': {
        'id': 'attlGNQqFXvhDYOrR',
        'url': 'https://dl.airtable.com/.attachments/a16bd38af1f3fea3f894dd2a37dbf4bd/baa538c3/apple-touch-icon.png',
        'filename': 'apple-touch-icon.png',
        'size': 11769,
        'type': 'image/png',
        'thumbnails': {
          'small': {
            'url': 'https://dl.airtable.com/.attachmentThumbnails/c8528519fa364ebc6c01a35834a06975/1720e171',
            'width': 36,
            'height': 36,
          },
          'large': {
            'url': 'https://dl.airtable.com/.attachmentThumbnails/f0f1a95475af253ef157f36faf598c99/2da93bc7',
            'width': 180,
            'height': 180,
          },
          'full': {
            'url': 'https://dl.airtable.com/.attachmentThumbnails/26551c4457369ea157cab82a2ac24368/8ea162cf',
            'width': 3000,
            'height': 3000,
          },
        },
      },
      'logoTitle': 'Awesome-looking Logo',
    },
    'products': [
      {
        '__typename': 'Product',
        'id': 'recFSrY2znI6Z8Dbj',
        'ref': 'hellur',
        'title': 'Hellur',
        'images': [
          {
            'id': 'att6JU52f5PlMuiRu',
            'url': 'https://dl.airtable.com/Uvg7ldEEQpqKhR3NKTGt_348s.jpg',
            'filename': '348s.jpg',
            'size': 17866,
            'type': 'image/jpeg',
            'thumbnails': {
              'small': {
                'url': 'https://dl.airtable.com/8C4cVNCES89lt6PnFH5W_348s.jpg',
                'width': 36,
                'height': 36,
              },
              'large': {
                'url': 'https://dl.airtable.com/TdSPVnVQISc0P0EdiiQw_348s.jpg',
                'width': 256,
                'height': 256,
              },
            },
          },
        ],
        'imagesTitle': ['Big City'],
        'description': 'Super longue **description**\n\nVous pouvez même [utiliser des liens](https://bluebottlecoffee.com/releases/costa-rica-vista-al-valle-honey)\n',
        'price': 25,
        'status': 'DRAFT',
      },
      {
        '__typename': 'Product',
        'id': 'recXxSwjiehedMFPf',
        'ref': 'wow',
        'title': 'wow',
        'images': [
          {
            'id': 'attIQzHRvFMgmdytF',
            'url': 'https://dl.airtable.com/.attachments/00f7560832b1500d06d169233424ccd0/c5d69a9e/lXL1TfOBTiikTCW8DPT2',
            'filename': 'lXL1TfOBTiikTCW8DPT2',
            'size': 64273,
            'type': 'image/jpeg',
            'thumbnails': {
              'small': {
                'url': 'https://dl.airtable.com/.attachmentThumbnails/8e2ab049c04e918ccf068eeb2363a24d/88511a89',
                'width': 54,
                'height': 36,
              },
              'large': {
                'url': 'https://dl.airtable.com/.attachmentThumbnails/6897834d90716b4221e88de8a7e5d17b/beacabda',
                'width': 729,
                'height': 486,
              },
              'full': {
                'url': 'https://dl.airtable.com/.attachmentThumbnails/d10c2858cbdd091db8ea5eb283d15ff5/8a483a20',
                'width': 3000,
                'height': 3000,
              },
            },
          },
        ],
        'imagesTitle': ['wow'],
        'description': 'w\n',
        'price': null,
        'status': 'PUBLISHED',
      },
    ],
    'serviceLabel': 'NRN demo 1',
    'termsDescription': '<Alert color="info">\nWe use this "terms" page to showcase what\'s achievable using Markdown + HTML + JSX. <br />\nYou can edit this through Stacker, see "Go to CMS" nav link.\n</Alert>\n\n---\n\nUsing Markdown\n\nHeading 2\nHeading 3\n\nBold\n\nItalic\n\nStrikethrough\n\nLink in new tab\n\n---\n\n<h1>Using HTML</h1>\n\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>\n\n<div>Text in div</div>\n\n<b>Bold</b>\n\n<br />\n\n<i>Italic</i>\n\n<br />\n\n<a href="https://google.com">Link (same tab)</a>\n\n<br />\n\n<a href="https://google.com" target="_blank" rel="noopener">Link (new tab)</a>\n\n---\n\nUsing JSX (React components)\n\nNote: Only a small subset of components are made available. It works based on a whitelist. You can see the full list here.\n\nComponents from Reactstrap\n\n<Alert color=\'info\'>An Alert "info"</Alert>\n\n<Alert color=\'success\'>An Alert "success"</Alert>\n\n<Button>A Button</Button>\n\n<br />\n<br />\n\n<Button color="primary">A Button "primary"</Button>\n\n<br />\n<br />\n\n<Row style="border: 1px solid">\n<Col style="font-size: 14px">\nCol 1 in a Row (with custom CSS)\n</Col>\n<Col>\nCol 2 in a Row\n</Col>\n</Row>\n\nCustom components\n\nHelp tooltips, using <code>Tooltip</code> component: <br />\n<Tooltip text="A tooltip help text">Some complex stuff (click/hover me!)</Tooltip>\n\n<br />\n\nLocalised links, using <code>I18nLink</code> component: <br />\n<I18nLink href="/">Link to homepage, keeping current locale</I18nLink>\n\n<br />\n\nButton to change the current locale, using <code>I18nBtnChangeLocale</code> component:<br />\n<I18nBtnChangeLocale />\n\n\n---\n\nNote: All links always open in a new tab with "noopener" to ensure proper security defaults. This only work when used from the app (not from Stacker)\n\nNote: Stacker can preview Markdown but not HTML/JSX. The behaviour between Stacker Markdown preview and real rendering can be different.\n\n<Alert color="warning">\nAs you can see above, using JSX brings quite a few interesting capabilities. But it  isn\'t all-powerful though.<br />\n\nIt\'s not possible to use JavaScript, so forget about using an <code>onClick</code> event for instance. You\'ll need to find workarounds for this kinds of things.<br />\n\nAlso, it\'s not possible to provide non-scalar props. Forget about providing a component with an object, or array, for instance.<br />\n\nNevertheless, it brings quite a few possibilities to your app. The secret is to keep things simple, using simple JSX components that rely on few props. The <code>I18nBtnChangeLocale</code> is a great example of that. No props, but changes the language for the whole app anyway, it\'s quite a powerful integration and very simple to use.\n</Alert>\n\n',
    'privacyDescription': '{serviceLabel} doesn\'t track any of your personal data.\n\nAnalytic data (such as page views) are being tracked for the whole site, **anonymously**.',
  },
  'recFSrY2znI6Z8Dbj': {
    '__typename': 'Product',
    'id': 'recFSrY2znI6Z8Dbj',
    'ref': 'hellur',
    'title': 'Hellur',
    'images': [
      {
        'id': 'att6JU52f5PlMuiRu',
        'url': 'https://dl.airtable.com/Uvg7ldEEQpqKhR3NKTGt_348s.jpg',
        'filename': '348s.jpg',
        'size': 17866,
        'type': 'image/jpeg',
        'thumbnails': {
          'small': {
            'url': 'https://dl.airtable.com/8C4cVNCES89lt6PnFH5W_348s.jpg',
            'width': 36,
            'height': 36,
          },
          'large': {
            'url': 'https://dl.airtable.com/TdSPVnVQISc0P0EdiiQw_348s.jpg',
            'width': 256,
            'height': 256,
          },
        },
      },
    ],
    'imagesTitle': ['Big City'],
    'description': 'Super longue **description**\n\nVous pouvez même [utiliser des liens](https://bluebottlecoffee.com/releases/costa-rica-vista-al-valle-honey)\n',
    'price': 25,
    'status': 'DRAFT',
  },
  'recXxSwjiehedMFPf': {
    '__typename': 'Product',
    'id': 'recXxSwjiehedMFPf',
    'ref': 'wow',
    'title': 'wow',
    'images': [
      {
        'id': 'attIQzHRvFMgmdytF',
        'url': 'https://dl.airtable.com/.attachments/00f7560832b1500d06d169233424ccd0/c5d69a9e/lXL1TfOBTiikTCW8DPT2',
        'filename': 'lXL1TfOBTiikTCW8DPT2',
        'size': 64273,
        'type': 'image/jpeg',
        'thumbnails': {
          'small': {
            'url': 'https://dl.airtable.com/.attachmentThumbnails/8e2ab049c04e918ccf068eeb2363a24d/88511a89',
            'width': 54,
            'height': 36,
          },
          'large': {
            'url': 'https://dl.airtable.com/.attachmentThumbnails/6897834d90716b4221e88de8a7e5d17b/beacabda',
            'width': 729,
            'height': 486,
          },
          'full': {
            'url': 'https://dl.airtable.com/.attachmentThumbnails/d10c2858cbdd091db8ea5eb283d15ff5/8a483a20',
            'width': 3000,
            'height': 3000,
          },
        },
      },
    ],
    'imagesTitle': ['wow'],
    'description': 'w\n',
    'price': null,
    'status': 'PUBLISHED',
  },
  'recrcZANU6L73OA9v': {
    '__typename': 'Theme',
    'id': 'recrcZANU6L73OA9v',
    'primaryColor': 'black',
    'primaryColorVariant1': null,
    'onPrimaryColor': null,
    'secondaryColor': null,
    'secondaryColorVariant1': null,
    'onSecondaryColor': null,
    'backgroundColor': null,
    'onBackgroundColor': null,
    'surfaceColor': null,
    'onSurfaceColor': null,
    'errorColor': null,
    'onErrorColor': null,
    'fonts': null,
    'logo': {
      'id': 'attlGNQqFXvhDYOrR',
      'url': 'https://dl.airtable.com/.attachments/a16bd38af1f3fea3f894dd2a37dbf4bd/baa538c3/apple-touch-icon.png',
      'filename': 'apple-touch-icon.png',
      'size': 11769,
      'type': 'image/png',
      'thumbnails': {
        'small': {
          'url': 'https://dl.airtable.com/.attachmentThumbnails/c8528519fa364ebc6c01a35834a06975/1720e171',
          'width': 36,
          'height': 36,
        },
        'large': {
          'url': 'https://dl.airtable.com/.attachmentThumbnails/f0f1a95475af253ef157f36faf598c99/2da93bc7',
          'width': 180,
          'height': 180,
        },
        'full': {
          'url': 'https://dl.airtable.com/.attachmentThumbnails/26551c4457369ea157cab82a2ac24368/8ea162cf',
          'width': 3000,
          'height': 3000,
        },
      },
    },
    'logoTitle': 'Awesome-looking Logo',
  },
};

export default dataset;
