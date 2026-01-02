import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface SearchForm {
  name: string;
  country: string;
  phone: string;
}

interface SearchResult {
  id: string;
  name: string;
  age: number;
  country: string;
  city: string;
  phone: string;
  email: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  occupation: string;
  education: string;
  relatives: string[];
}

const Index = () => {
  const [searchForm, setSearchForm] = useState<SearchForm>({
    name: '',
    country: '',
    phone: ''
  });
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<Array<{name: string; date: string}>>([
    { name: 'Алексей Петров', date: '2 часа назад' },
    { name: 'Мария Иванова', date: '5 часов назад' },
    { name: 'Дмитрий Сидоров', date: 'Вчера' }
  ]);

  const handleSearch = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      setSearchResult({
        id: '1',
        name: searchForm.name || 'Иван Смирнов',
        age: 32,
        country: searchForm.country || 'Россия',
        city: 'Москва',
        phone: searchForm.phone || '+7 (999) 123-45-67',
        email: 'ivan.smirnov@email.com',
        socialMedia: {
          facebook: 'facebook.com/ivansmirnov',
          instagram: '@ivan_smirnov',
          linkedin: 'linkedin.com/in/ivansmirnov',
          twitter: '@ivan_sm'
        },
        occupation: 'Веб-разработчик',
        education: 'МГУ, Факультет ВМК',
        relatives: ['Смирнова Анна (супруга)', 'Смирнов Пётр (отец)', 'Смирнова Ольга (мать)']
      });
      setIsSearching(false);
      
      if (searchForm.name) {
        setSearchHistory(prev => [{
          name: searchForm.name,
          date: 'Только что'
        }, ...prev.slice(0, 4)]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Search" size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              PeopleSearch
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Найдите информацию о человеке по имени, стране и номеру телефона
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto mb-8 p-8 bg-card border-primary/20">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Имя и Фамилия</label>
              <Input
                placeholder="Иван Смирнов"
                value={searchForm.name}
                onChange={(e) => setSearchForm({...searchForm, name: e.target.value})}
                className="bg-muted border-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Страна</label>
              <Input
                placeholder="Россия"
                value={searchForm.country}
                onChange={(e) => setSearchForm({...searchForm, country: e.target.value})}
                className="bg-muted border-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Номер телефона</label>
              <Input
                placeholder="+7 (999) 123-45-67"
                value={searchForm.phone}
                onChange={(e) => setSearchForm({...searchForm, phone: e.target.value})}
                className="bg-muted border-input"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
            size="lg"
          >
            {isSearching ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Поиск...
              </>
            ) : (
              <>
                <Icon name="Search" size={20} className="mr-2" />
                Найти информацию
              </>
            )}
          </Button>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Search Results */}
          <div className="lg:col-span-2">
            {searchResult ? (
              <div className="space-y-6 animate-fade-in">
                {/* Main Profile Card */}
                <Card className="p-6 bg-card border-primary/20">
                  <div className="flex items-start gap-6 mb-6">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                        {searchResult.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">{searchResult.name}</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {searchResult.city}, {searchResult.country}
                        </Badge>
                        <Badge variant="outline">{searchResult.age} лет</Badge>
                      </div>
                      <p className="text-muted-foreground">{searchResult.occupation}</p>
                    </div>
                  </div>

                  <Tabs defaultValue="contacts" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="contacts">Контакты</TabsTrigger>
                      <TabsTrigger value="social">Соцсети</TabsTrigger>
                      <TabsTrigger value="education">Образование</TabsTrigger>
                      <TabsTrigger value="relatives">Родственники</TabsTrigger>
                    </TabsList>

                    <TabsContent value="contacts" className="space-y-4 mt-4">
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon name="Phone" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Телефон</p>
                          <p className="font-semibold">{searchResult.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                          <Icon name="Mail" size={20} className="text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-semibold">{searchResult.email}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-3 mt-4">
                      {searchResult.socialMedia.facebook && (
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <Icon name="Facebook" size={20} className="text-primary" />
                            <span>Facebook</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{searchResult.socialMedia.facebook}</span>
                        </div>
                      )}
                      {searchResult.socialMedia.instagram && (
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <Icon name="Instagram" size={20} className="text-secondary" />
                            <span>Instagram</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{searchResult.socialMedia.instagram}</span>
                        </div>
                      )}
                      {searchResult.socialMedia.linkedin && (
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <Icon name="Linkedin" size={20} className="text-accent" />
                            <span>LinkedIn</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{searchResult.socialMedia.linkedin}</span>
                        </div>
                      )}
                      {searchResult.socialMedia.twitter && (
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <Icon name="Twitter" size={20} className="text-primary" />
                            <span>Twitter</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{searchResult.socialMedia.twitter}</span>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="education" className="mt-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <Icon name="GraduationCap" size={24} className="text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Образование</h4>
                            <p className="text-muted-foreground">{searchResult.education}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="relatives" className="space-y-2 mt-4">
                      {searchResult.relatives.map((relative, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                          <Icon name="Users" size={20} className="text-secondary" />
                          <span>{relative}</span>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            ) : (
              <Card className="p-12 text-center bg-card border-dashed border-2 border-muted">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Начните поиск</h3>
                <p className="text-muted-foreground">
                  Заполните форму выше и нажмите кнопку поиска, чтобы найти информацию о человеке
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search History */}
            <Card className="p-6 bg-card border-primary/20">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="History" size={20} className="text-primary" />
                История поиска
              </h3>
              <div className="space-y-3">
                {searchHistory.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  >
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <div className="flex gap-3">
                <Icon name="Info" size={20} className="text-primary mt-1" />
                <div>
                  <h4 className="font-bold mb-2">Важная информация</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Все данные получены из публичных источников и социальных сетей.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Сервис предоставляет информацию исключительно в ознакомительных целях.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
