/**
 * @flow
 */

import axios from 'axios'

type Package = {
  name: string,
  description: string,
  authors: Array<string>,
  labels: Array<string>,
  unique_installs: number,
  st_versions: Array<number>,
  installs_rank: number,
  trending_rank: ?number,
  first_seen: string,
  last_seen: string,
  last_modified: string,
  is_missing: boolean,
  platforms: Array<'windows' | 'osx' | 'linux'>,
  missing_error?: string,
  highlighted_name?: string,
  highlighted_authors?: Array<string>,
  z_value?: ?number
}

type Packages = Array<Package>

type SearchOptions = {
  labels?: string | Array<string>,
  limit?: number
}

async function fetchPackages(url: string): Promise<Packages> {
  const baseURL = 'https://packagecontrol.io/'
  const response = await axios({ baseURL, url, responseType: 'json' })
  const packages: Packages = response.data.packages
  return packages
}

class PackageControl {
  async search(query: string, opts?: SearchOptions = {}) {
    const { labels, limit } = opts
    const packages = await fetchPackages(`search/${query}.json`)

    if (!labels) {
      return packages.slice(0, limit)
    }

    let searchLabels

    if (typeof labels === 'string') {
      searchLabels = [labels]
    }

    return packages
      .filter(pkg => searchLabels.every(label => pkg.labels.includes(label)))
      .slice(0, limit)
  }

  async getColorSchemes(limit?: number) {
    const packages = await fetchPackages('browse/labels/color scheme.json')
    return packages.slice(0, limit)
  }

  async getThemes(limit?: number) {
    const packages = await fetchPackages('browse/labels/theme.json')
    return packages.slice(0, limit)
  }

  async getLanguages(limit?: number) {
    const packages = await fetchPackages('browse/labels/language syntax.json')
    return packages.slice(0, limit)
  }
}

export type { Package, Packages, SearchOptions }
export default PackageControl
