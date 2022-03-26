import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Track from 'App/Models/Track'

export default class TrackPolicy extends BasePolicy {
  public async viewList(currentUser: User) {
    return currentUser.isAdmin
  }

  public async view(currentUser: User, track: Track) {
    return currentUser.isAdmin || currentUser.id === track.userId
  }

  public async create(currentUser: User) {
    return currentUser.isAdmin
  }

  public async update(currentUser: User, track: Track) {
    return currentUser.isAdmin || currentUser.id === track.userId
  }

  public async delete(currentUser: User, track: Track) {
    return currentUser.isAdmin || currentUser.id === track.userId
  }
}
