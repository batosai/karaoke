import '../css/app.css'

import '@hotwired/turbo'
import Alpine from 'alpinejs'

import destination from './components/destination'
import source from './components/source'

Alpine.data('destination', destination)
Alpine.data('source', source)

Alpine.start()
