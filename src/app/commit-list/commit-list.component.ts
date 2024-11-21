import { Component, inject } from '@angular/core';
import { GithubService } from '../service/github.service';

@Component({
  selector: 'app-commit-list',
  standalone: true,
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss'],
})
export class CommitListComponent {
  githubService = inject(GithubService);
  commits: any[] = [];
  search = '';

  ngOnInit() {
    const owner = 'DSubhashree95'; // Replace with user input
    const repo = 'DSubhashree95'; // Replace with user input

    this.githubService.getCommits(owner, repo).subscribe((data) => (this.commits = data));
  }

  filteredCommits() {
    return this.commits.filter((commit) =>
      commit.commit.message.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
