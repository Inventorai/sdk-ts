import { HttpClient } from '../http/client';
import { Team } from '../types';

export class TeamResource {
  constructor(private http: HttpClient) {}

  /**
   * Get the team behind the current API token.
   *
   * Returns the team's id, name, slug, address, branding, subscription
   * state, inspection hours, and option presets. Call this on startup to
   * resolve the team_id for the `private-team.{id}` socket channel and
   * to surface branding to your users.
   */
  async current(): Promise<{ data: Team }> {
    return this.http.get('');
  }
}
