import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'leaderboard' | 'profile' | 'withdraw' | 'wallet';

const Index = () => {
  const [page, setPage] = useState<Page>('home');
  const [balance, setBalance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [referralCode] = useState('REF' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [referralEarnings] = useState(142.50);

  const handleTap = () => {
    setBalance(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const leaderboardData = [
    { name: 'Александр К.', amount: 15420, avatar: 'АК' },
    { name: 'Мария В.', amount: 12850, avatar: 'МВ' },
    { name: 'Дмитрий П.', amount: 11200, avatar: 'ДП' },
    { name: 'Елена С.', amount: 9870, avatar: 'ЕС' },
    { name: 'Игорь Т.', amount: 8650, avatar: 'ИТ' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 pb-20">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TapRuble
            </h1>
            <p className="text-sm text-muted-foreground">Заработай кликом</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/20">
            <Icon name="Wallet" size={18} className="text-primary" />
            <span className="font-bold text-lg">{balance} ₽</span>
          </div>
        </div>

        <div className="mb-8 animate-fade-in">
          {page === 'home' && (
            <div className="flex flex-col items-center gap-8">
              <Card className="w-full p-6 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Твой баланс</h2>
                  <p className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {balance} ₽
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleTap}
                    className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 transition-all hover:scale-105 active:scale-95 ${
                      isAnimating ? 'animate-pulse-scale' : ''
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Hand" size={64} className="mx-auto mb-2 text-white drop-shadow-lg" />
                        <span className="text-2xl font-bold text-white drop-shadow-lg">TAP!</span>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Всего кликов</p>
                    <p className="text-xl font-bold">{balance}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">От рефералов</p>
                    <p className="text-xl font-bold">{referralEarnings.toFixed(2)} ₽</p>
                  </div>
                </div>
              </Card>

              <Card className="w-full p-4 bg-gradient-to-r from-accent/20 to-secondary/20 border-accent/30">
                <div className="flex items-start gap-3">
                  <Icon name="Gift" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Реферальная программа</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Получай 10% от заработка каждого приглашённого друга
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-accent/50 hover:bg-accent/10"
                      onClick={() => setPage('profile')}
                    >
                      Пригласить друзей
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {page === 'leaderboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Trophy" size={28} className="text-accent" />
                Таблица лидеров
              </h2>
              <div className="space-y-3">
                {leaderboardData.map((user, index) => (
                  <Card key={index} className="p-4 bg-card border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-accent text-accent-foreground border-accent' :
                            index === 1 ? 'bg-secondary/30 border-secondary' :
                            index === 2 ? 'bg-primary/30 border-primary' :
                            'bg-muted border-muted-foreground/30'
                          }`}
                        >
                          {index + 1}
                        </Badge>
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.amount.toLocaleString()} ₽
                          </p>
                        </div>
                      </div>
                      {index < 3 && <Icon name="Award" size={24} className="text-accent" />}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {page === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="User" size={28} className="text-primary" />
                Профиль
              </h2>
              
              <Card className="p-6 mb-4 bg-gradient-to-br from-card to-primary/5 border-primary/20">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-to-br from-primary via-secondary to-accent text-white text-2xl">
                      ТЫ
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">Твой аккаунт</h3>
                    <p className="text-sm text-muted-foreground">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Баланс</p>
                    <p className="text-2xl font-bold">{balance} ₽</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground mb-1">От рефералов</p>
                    <p className="text-2xl font-bold">{referralEarnings.toFixed(2)} ₽</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Твоя реферальная ссылка</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={`taprubles.com/ref/${referralCode}`}
                        readOnly
                        className="flex-1 px-4 py-2 rounded-lg bg-muted border border-input text-sm"
                      />
                      <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                  </div>

                  <Card className="p-4 bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Icon name="Users" size={18} className="text-secondary" />
                      Реферальная программа
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Приглашай друзей и получай 10% от их заработка навсегда
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Приглашено друзей:</span>
                      <Badge variant="secondary">3 человека</Badge>
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          )}

          {page === 'withdraw' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="ArrowUpRight" size={28} className="text-accent" />
                Вывод средств
              </h2>
              
              <Card className="p-6 mb-4 bg-gradient-to-br from-card to-accent/5 border-accent/20">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Доступно для вывода</p>
                  <p className="text-4xl font-black bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                    {balance} ₽
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сумма вывода</label>
                    <input
                      type="number"
                      placeholder="Введите сумму"
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-input"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Номер кошелька</label>
                    <input
                      type="text"
                      placeholder="Введите номер кошелька"
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-input"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90">
                    <Icon name="Send" size={18} className="mr-2" />
                    Вывести средства
                  </Button>
                </div>
              </Card>

              <Card className="p-4 bg-muted/30 border-muted">
                <div className="flex gap-3">
                  <Icon name="Info" size={20} className="text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Минимальная сумма вывода: 100 ₽</p>
                    <p>Время обработки: 1-3 рабочих дня</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {page === 'wallet' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Wallet" size={28} className="text-primary" />
                Кошелёк
              </h2>
              
              <Card className="p-6 mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Общий баланс</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                    {(balance + referralEarnings).toFixed(2)} ₽
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon name="MousePointerClick" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">От кликов</p>
                        <p className="text-xs text-muted-foreground">Заработано тапами</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">{balance} ₽</p>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Icon name="Users" size={20} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold">От рефералов</p>
                        <p className="text-xs text-muted-foreground">10% комиссия</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">{referralEarnings.toFixed(2)} ₽</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="border-primary/50 hover:bg-primary/10"
                  onClick={() => setPage('withdraw')}
                >
                  <Icon name="ArrowUpRight" size={18} className="mr-2" />
                  Вывести
                </Button>
                <Button 
                  variant="outline"
                  className="border-secondary/50 hover:bg-secondary/10"
                >
                  <Icon name="History" size={18} className="mr-2" />
                  История
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setPage('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                page === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs font-medium">Главная</span>
            </button>
            
            <button
              onClick={() => setPage('leaderboard')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                page === 'leaderboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Trophy" size={24} />
              <span className="text-xs font-medium">Лидеры</span>
            </button>
            
            <button
              onClick={() => setPage('wallet')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                page === 'wallet' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Wallet" size={24} />
              <span className="text-xs font-medium">Кошелёк</span>
            </button>
            
            <button
              onClick={() => setPage('withdraw')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                page === 'withdraw' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="ArrowUpRight" size={24} />
              <span className="text-xs font-medium">Вывод</span>
            </button>
            
            <button
              onClick={() => setPage('profile')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                page === 'profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs font-medium">Профиль</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;